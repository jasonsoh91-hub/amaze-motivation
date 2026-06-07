import { NextResponse } from 'next/server'

const AC_API_URL = process.env.ACTIVECAMPAIGN_API_URL
const AC_API_KEY = process.env.ACTIVECAMPAIGN_API_KEY
const AC_LIST_ID = process.env.ACTIVECAMPAIGN_LIST_ID

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // First, get all existing contacts to find if this email already exists
    const searchResponse = await fetch(
      `${AC_API_URL}/api/3/contacts?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Api-Token': AC_API_KEY || '',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    )

    const searchData = await searchResponse.json()
    let contactId = searchData?.contacts?.[0]?.id

    // If contact doesn't exist, create a new one
    if (!contactId) {
      const createResponse = await fetch(`${AC_API_URL}/api/3/contacts`, {
        method: 'POST',
        headers: {
          'Api-Token': AC_API_KEY || '',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          contact: {
            email,
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' ') || '',
          },
        }),
      })

      const createData = await createResponse.json()

      if (createData.errors) {
        console.error('ActiveCampaign create error:', createData.errors)
        return NextResponse.json(
          { error: 'Failed to create contact' },
          { status: 500 }
        )
      }

      contactId = createData.contact?.id
    }

    // If list ID is configured, add contact to the list
    if (AC_LIST_ID && contactId) {
      await fetch(`${AC_API_URL}/api/3/contacts/${contactId}/contactLists`, {
        method: 'POST',
        headers: {
          'Api-Token': AC_API_KEY || '',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          contactList: {
            contact: contactId,
            list: AC_LIST_ID,
            status: 1, // 1 = active, 2 = unsubscribed
          },
        }),
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Contact submitted successfully',
      contactId,
    })
  } catch (error) {
    console.error('ActiveCampaign API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

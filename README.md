# Southfield Biochem — corporate website

Next.js 15 site for southfieldbiochem.com (private label / OEM / ODM / export glycerin soap, Kerala).

## Run locally
    npm install
    cp .env.example .env.local   # fill in keys
    npm run dev

## Enquiry form
`POST /api/enquiry` saves each lead to the Supabase `enquiries` table (see `supabase.sql`) and emails it via Resend to `ENQUIRY_TO` (default b2b@southfieldbiochem.com). Both are optional: with no keys set, the form still returns success (useful for preview), so set the env vars in Vercel before launch.

## Assets
Product/factory images in `public/images`; company profile PDF in `public/`.

# GrabTask

A task-based rewards platform where users can earn money by completing offers, surveys, and other tasks.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth (Google Sign-In)
- **Database**: PostgreSQL (Neon) + Prisma ORM
- **Offers Provider**: CPALead API

## Features

- Google Sign-In authentication
- Offer wall with tasks from CPALead
- Filter tasks by country and device type
- User balance tracking
- Transaction history
- Postback handling for completed offers

## Project Structure

```
src/
├── app/
│   ├── (admin)/          # Admin panel (future)
│   ├── (marketing)/      # Marketing pages
│   │   ├── layout.tsx    # Header + navigation
│   │   └── page.tsx      # Homepage
│   ├── (studio)/         # Main app
│   │   └── earn/         # Earn/tasks page
│   └── api/
│       ├── offers/       # CPALead offers proxy
│       └── postback/     # Postback handlers
│           └── cpalead/
├── components/
│   ├── AuthModal.tsx     # Sign-in modal
│   ├── Header.tsx        # Navigation header
│   └── OfferCard.tsx     # Task card component
├── config/
│   ├── auth.ts           # Auth providers config
│   └── cpalead.ts        # CPALead config
├── contexts/
│   └── AuthContext.tsx   # Firebase auth context
└── lib/
    ├── firebase.ts       # Firebase client config
    └── prisma.ts         # Prisma client
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Neon Database
DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech/neondb?sslmode=require"
```

## Local Development

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Database Schema

### User
| Field | Type | Description |
|-------|------|-------------|
| id | String | Firebase UID |
| email | String | User email |
| displayName | String | Display name |
| balance | Decimal | Current balance |
| totalEarned | Decimal | Lifetime earnings |

### Transaction
| Field | Type | Description |
|-------|------|-------------|
| id | String | Transaction ID |
| userId | String | User reference |
| amount | Decimal | Payout amount |
| source | String | Offer source (cpalead, etc.) |
| offerName | String | Name of completed offer |
| status | String | pending/completed/rejected |

### Withdrawal
| Field | Type | Description |
|-------|------|-------------|
| id | String | Withdrawal ID |
| userId | String | User reference |
| amount | Decimal | Withdrawal amount |
| method | String | Payment method (paypal, crypto) |
| address | String | Payment address |
| status | String | pending/processing/completed/rejected |

## API Endpoints

### GET /api/offers
Fetch available offers from CPALead.

| Parameter | Description |
|-----------|-------------|
| subid | User ID for tracking |
| country | Country code or "user" for auto-detect |
| device | "user", "ios", "android", "desktop" |

### GET /api/postback/cpalead
Receive postback from CPALead when user completes an offer.

| Parameter | Description |
|-----------|-------------|
| subid | User ID |
| payout | Payout amount |
| offer_name | Offer name |
| ip | User IP |

## CPALead Configuration

1. Get your Publisher ID from CPALead dashboard
2. Update `src/config/cpalead.ts` with your ID
3. Configure postback URL in CPALead:
   ```
   https://yourdomain.com/api/postback/cpalead?subid={subid}&payout={payout}&offer_name={offer_name}&ip={ip}
   ```

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Google Sign-In in Authentication > Sign-in method
3. Add your domain to authorized domains
4. Copy config to `src/lib/firebase.ts`

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variable: `DATABASE_URL`
4. Deploy

### Manual Build

```bash
npm run build
npm start
```

## License

MIT
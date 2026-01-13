export const cpaleadConfig = {
  publisherId: "3332955",
  apiEndpoint: "https://www.cpalead.com/api/offers",

  // Offer Wall iframe URL
  offerWallUrl: (userId: string) =>
    `https://www.cpalead.com/wall.php?id=3332955&subid=${userId}`,

  // Alternative: API-based offers (fetch and display custom UI)
  offersApiUrl: (userId: string) =>
    `https://www.cpalead.com/api/offers?id=3332955&subid=${userId}`,

  // Postback URL to configure in CPALead dashboard:
  // https://yourdomain.com/api/postback/cpalead?subid={subid}&payout={payout}&offer_name={offer_name}&ip={ip}
};
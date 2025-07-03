import User from "../../models/user.model.js";

const REQUIRED_SCOPES = [
  "read_products",
  "write_products",
  "read_themes",
  "write_themes"
];

// Shopify GraphQL endpoint (latest stable version)
const getGraphQLUrl = (storeUrl) =>
  `https://${storeUrl}/admin/api/2024-04/graphql.json`;

export const connectShopify = async (req, res) => {
  try {
    const { storeUrl, accessToken } = req.body;
    const userId = req.user?.id;

    if (!userId || !storeUrl || !accessToken) {
      return res.status(400).json({ 
        status:"fail",
        message: "Missing required fields" });
    }

    // 1️⃣ Verify the token using a basic query
    const testQuery = `
      {
        shop {
          name
          primaryDomain {
            url
          }
        }
      }
    `;

    const graphqlUrl = getGraphQLUrl(storeUrl);
    const fetchOptions = {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: testQuery }),
    };

    const testRes = await fetch(graphqlUrl, fetchOptions);
    const testData = await testRes.json();

    if (!testData?.data?.shop) {
      return res.status(401).json({ 
        status:"fail",
        message: "Invalid token or store URL." });
    }

    // 2️⃣ Fetch granted access scopes
    const scopeRes = await fetch(`https://${storeUrl}/admin/oauth/access_scopes.json`, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
    });

    const scopeData = await scopeRes.json();
    const grantedScopes = scopeData.access_scopes.map((s) => s.handle);

    const missingScopes = REQUIRED_SCOPES.filter(
      (scope) => !grantedScopes.includes(scope)
    );

    if (missingScopes.length > 0) {
      return res.status(403).json({
        status:"fail",
        message: "Missing required Shopify permissions",
        missingScopes,
      });
    }

    // 3️⃣ Save Shopify credentials in DB
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({
        status:"fail",
        message: "Unauthorized access." });

    user.shopify = {
      storeUrl,
      accessToken,
      isConnected: true,
    };

    await user.save();

    const { shopify } = user.toObject();
    delete shopify.accessToken;

    return res.status(200).json({
        status: "success",
      message: "Shopify store connected successfully",
      shopify,
    });
  } catch (err) {
    console.error("Shopify connect error:", err);
    return res.status(500).json({
        status:"fail",
        message: "Server error. Please try again." });
  }
};

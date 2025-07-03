export const getConnectionStatus = async (req, res) => {
    const user = req.user;

    try {
        if ( !user) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid request'
            })
        }
        if ( user.shopify.isConnected) {
            return res.status(200).json({
                status: 'success',
                data: {
                    shopify: true,
                    meta: false
                }
            })

        } else {
            return res.status(200).json({
                status: 'success',
                data: {
                    shopify: false,
                    meta: false
                }
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }




}

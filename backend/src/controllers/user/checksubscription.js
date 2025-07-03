export const checkSubscription = async (req, res) => {
    const user = req.user;

    try {
        if ( !user) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid request'
            })
        }
        if ( user.subscription.isActive) {
            return res.status(200).json({
                status: 'success',
                isSubcriptionActive: true,
                data: {
                    
                    plan:user.subscription.planName,
                    expiry: user.subscription.currentPeriodEnd,
                    startDate: user.subscription.startDate,
                    billingCycle: user.subscription.billingCycle
                }
            })

        } else {
            return res.status(200).json({
                status: 'success',
                isSubcriptionActive: false
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

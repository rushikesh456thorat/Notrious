const logout = (req, res) => {    
     

    try{

        res.cookie("notrious_jwt","", {maxAge:0});
        res.status(200).json({
                    status: 'success',
                    message: "Logged out successfully!"
        });

    }catch(error)
    {
        console.log("Error in logout controller", error.message)
        res.status(500).json({
            status: 'fail',
                    message: "Internal server error"
            });
    }
};
export default logout;
function setCookies (res, token){
    // cookie expires after 7 days
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        path: '/api/auth/token',
        expires: new Date(Date.now() + 7*24*60*60*1000),
    };
    res.cookie('refreshToken', token, cookieOptions);
}

module.exports = {
    setCookies
}
import React, { useEffect } from "react"

const BlogAd = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (err) {
            console.log(err);
        }
    }, [])


    return (
        <>
            {process.env.NODE_ENV !== 'development' ?
                <div style={{ width: '100%', marginTop: "5px", marginBottom: "5px", overflowX: 'scroll' }}>
                    <ins className="adsbygoogle"
                        style={{ display: 'block' }}
                        data-ad-format="fluid"
                        data-ad-layout-key="-fb+5w+4e-db+86"
                        data-ad-client="ca-pub-8586017200531248"
                        data-ad-slot="2779657459" />
                </div> : null}
        </>
    )
}

export default BlogAd
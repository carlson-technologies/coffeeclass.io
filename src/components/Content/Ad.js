import React, { useEffect } from "react"

const CarbonAd = () => {
    useEffect(() => {
        try {
            const script = document.createElement("script")
            script.async = true
            script.type = "text/javascript"
            script.src = "//cdn.carbonads.com/carbon.js?serve=CEAI453W&placement=wwwcoffeeclassio"
            script.id = "_carbonads_js"
            const carbon = document.getElementById("carbonads")
            if (!carbon.hasChildNodes()) { // avoids rendering 2 ads. Not sure why it does this.
                carbon.appendChild(script)
            }
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <>
            {process.env.NODE_ENV === "production" && (
                <div id="carbonads" />
            )}
        </>
    )
}

export default CarbonAd
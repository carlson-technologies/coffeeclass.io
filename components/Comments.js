// coffeeclass.io uses giscus for comments. https://giscus.app/

import React, { Component } from "react";
export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.commentBox = React.createRef();
    }

    componentDidMount() {
        let scriptEl = document.createElement("script");
        scriptEl.setAttribute("src", "https://giscus.app/client.js");
        scriptEl.setAttribute("data-repo", "carlson-technologies/coffeeclass.io");
        scriptEl.setAttribute("data-repo-id", "MDEwOlJlcG9zaXRvcnkzNTQxODIwODI=");
        scriptEl.setAttribute("data-category", "Website Comments");
        scriptEl.setAttribute("data-category-id", "MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMzMDc3MDQ5");
        scriptEl.setAttribute("data-mapping", "url");
        scriptEl.setAttribute("data-reactions-enabled", "1");
        scriptEl.setAttribute("data-theme", "preferred_color_scheme");
        scriptEl.setAttribute("crossorigin", "anonymous");
        scriptEl.setAttribute("async", true);
        this.commentBox.current.appendChild(scriptEl);
    }

    render() {
        return (
            <div style={{ width: '100%' }} id="comments">
                <div ref={this.commentBox} />
            </div>
        );
    }
}
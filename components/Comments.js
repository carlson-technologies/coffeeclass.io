import React, { Component } from "react";

export default class Comments extends Component {

    constructor(props) {
        super(props);
        this.commentBox = React.createRef();
        // window.addEventListener('storage', () => {
        //     console.log(localStorage.getItem('chakra-ui-color-mode'));
        // });
    }

    componentDidMount() {
        // console.log(theme.config.initialColorMode)
        let colorMode = localStorage.getItem('chakra-ui-color-mode');
        const utteranceTheme = colorMode === "dark" ? "github-dark" : "github-light";
        let scriptEl = document.createElement("script");
        scriptEl.setAttribute("src", "https://utteranc.es/client.js");
        scriptEl.setAttribute("crossorigin", "anonymous");
        scriptEl.setAttribute("async", true);
        scriptEl.setAttribute("repo", "bjcarlson42/comments-coffeeclass.io");
        scriptEl.setAttribute("issue-term", "url");
        scriptEl.setAttribute("theme", utteranceTheme);
        // scriptEl.setAttribute("theme", 'github-light');
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
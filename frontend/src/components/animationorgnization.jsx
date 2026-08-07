import React from "react";
import "./animationorganization.css"

export default function AnimationOrganization() {
    return (
        <svg className="circuit" viewBox="0 0 80 60" width="160" height="120">
            <path
                d="M8,30 H22 V12 H58 V30 H72 M58,30 V48 H22 V30"
                fill="none"
                stroke="#14b8a6"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                opacity="0.18"
            ></path>

            <path
                className="trace"
                d="M8,30 H22 V12 H58 V30 H72 M58,30 V48 H22 V30"
                fill="none"
                stroke="#14b8a6"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>

            <circle r="3.5" fill="#FFD93D">
                <animateMotion dur="3s" repeatCount="indefinite">
                    <mpath href="#guide"></mpath>
                </animateMotion>
            </circle>

            <path
                id="guide"
                d="M8,30 H22 V12 H58 V30 H72 M58,30 V48 H22 V30"
                fill="none"
            ></path>

            <circle cx="22" cy="12" r="2.5" fill="#2DD4BF" opacity="0.55"></circle>
            <circle cx="58" cy="12" r="2.5" fill="#2DD4BF" opacity="0.55"></circle>
            <circle cx="22" cy="48" r="2.5" fill="#2DD4BF" opacity="0.55"></circle>
            <circle cx="58" cy="48" r="2.5" fill="#2DD4BF" opacity="0.55"></circle>
        </svg>
        )
}
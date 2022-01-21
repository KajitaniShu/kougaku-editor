import React from 'react'
import {SidebarData} from "./SidebarData";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <ul className="sidebarList">
                {SidebarData.map((value, key) => {
                    return (
                        <li key={key} className={`row ${value.selected ? "selected" : ""}`}>
                            <div id="icon">{value.icon}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

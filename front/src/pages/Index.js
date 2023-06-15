import React from "react"
import Dashboard from "./user/Dashboard"

const Index = () => {
	if (localStorage.getItem("authTokens") === null) {
		return (
			<div>
				<h1>Index</h1>
			</div>
		)
	} else {
		return <Dashboard />
	}
}

export default Index

"use client";

import { ToastContainer } from "react-toastify";

export default function Toaster() {
	return (
		<ToastContainer
			position="top-right"
			autoClose={3000}
			theme="dark"
			toastClassName="rounded-lg shadow-md"
			hideProgressBar={false}
		/>
	);
}

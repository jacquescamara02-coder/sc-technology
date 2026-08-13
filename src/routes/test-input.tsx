import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/test-input")({
component: TestInput,
});

function TestInput() {
const [value, setValue] = useState("");
return (
<div style={{ padding: 40, background: "#16213f", minHeight: "100vh", color: "white" }}>
<h1>Test clavier minimal</h1>
<input
value={value}
onChange={(e) => setValue(e.target.value)}
placeholder="Tape ici"
style={{ padding: 12, fontSize: 16, width: "100%", marginTop: 20 }}
/>
<p style={{ marginTop: 20 }}>Valeur : {value}</p>
</div>
);
}

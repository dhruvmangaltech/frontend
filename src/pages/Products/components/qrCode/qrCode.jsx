import * as React from 'react'
import QRCode from "react-qr-code";
import { useParams } from 'react-router-dom';

const QrCode = () => {
	const { productId } = useParams();

	const data = {
		productId,
		type: 'Fraxus Stock Management'
	}

	const qrRef = React.useRef(); // Reference to the QR Code

  const handleDownload = () => {
    const svgElement = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.svg"; // Change the file extension to PNG if needed
    link.click();
  };



	return (
		<>
			<div ref={qrRef}>
			<QRCode
				size={256}
				style={{ height: "auto", maxWidth: "40%", width: "40%" }}
				value={JSON.stringify(data)}
				viewBox={`0 0 256 256`}
			/>
			</div>
			<button onClick={handleDownload} style={{ marginTop: "10px" }}>
        Download QR Code
      </button>

		</>
	)
}

export default QrCode   
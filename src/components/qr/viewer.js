import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { GetUserUUID } from "src/selectors";

// cb99614f-d08c-475d-bbb6-63d61def98bd

export function QRViewer() {
  const myUUID = GetUserUUID();

  return <QRCode value={myUUID} />;
}

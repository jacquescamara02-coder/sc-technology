import UIKit
import Capacitor
import WebKit

class MainViewController: CAPBridgeViewController {
func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
print("WebContent process terminated — reloading")
webView.reload()
}
}

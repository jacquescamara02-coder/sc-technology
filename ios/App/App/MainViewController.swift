import UIKit
import Capacitor
import WebKit

class MainViewController: CAPBridgeViewController, WKNavigationDelegate {
override func capacitorDidLoad() {
super.capacitorDidLoad()
self.webView?.navigationDelegate = self
}

func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
print("WebContent process terminated — reloading")
webView.reload()
}
}

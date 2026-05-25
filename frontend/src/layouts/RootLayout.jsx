import Navbar from './Navbar'
import Footer from './Footer'

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

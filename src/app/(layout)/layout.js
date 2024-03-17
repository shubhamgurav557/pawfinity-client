import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";

export default function PageLayout({ children }) {
    return (
        <>
            <header>
                <Navigation />
            </header>
            <main className="main" style={{paddingTop: '6rem'}}>
                {children}
            </main>
        </>
    )
}
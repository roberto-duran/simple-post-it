import './globals.css'
import { Roboto} from "@next/font/google";
import Nav from "@/app/components/Nav";
import QueryWrapper from "@/app/components/QueryWrapper";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ['400', '700'],
    variable: "--font-roboto"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={roboto.variable}>
            <head/>
            <body className="mx-4 md:mx-48 xl:mx-96 bg-gray-200">
                <QueryWrapper>
                    {/*@ts-ignore*/}
                    <Nav />
                    <main>
                        {children}
                    </main>
                </QueryWrapper>
            </body>
        </html>
    )
}

import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
    return (
        <header className="z-70 w-full border-b ">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex gap-6 md:gap-10">
                    {/* <Link href="/admin" className="flex items-center space-x-2"> */}
                    <span className="inline-block text-xl font-playfair font-bold ">
                        {siteConfig.name}
                    </span>
                    {/* </Link> */}
                    {/* {siteConfig.mainNav?.length ? (
                        <nav className="flex gap-6">
                            {siteConfig.mainNav?.map(
                                (item, index) =>
                                    item.href && (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                                        >
                                            {item.title}
                                        </Link>
                                    )
                            )}
                        </nav>
                    ) : null} */}
                </div>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1">
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-foreground"
                        ></Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

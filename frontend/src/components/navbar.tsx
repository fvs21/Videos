import { useUser } from "@/api/auth"

export default function Navbar() {
    const { user, isLoading } = useUser();

    return (
        <nav className="w-full sticky top-0 z-50 bg-white border-b border-gray-200 min-h-[60px] px-4">
            <div className="max-w-screen-xl h-full flex flex-wrap items-center justify-between mx-auto">
                <h1 className="font-bold text-xl">Videos</h1>
                {!isLoading && user && (
                    <div className="flex items-center">
                        <span className="mr-4 font-medium">{user.username}</span>
                        <img src={user.pfp_url} alt="Profile" className="w-8 h-8 rounded-full" />
                    </div>
                )}
            </div>
        </nav>
    )
}
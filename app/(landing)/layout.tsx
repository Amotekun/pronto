const LandingLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className="h-full bg-slate-300 overflow-auto">
            <div className="mx-auto max-w-screen h-full w-full " >
                {children}
            </div>
        </main>
    )
}

export default LandingLayout;
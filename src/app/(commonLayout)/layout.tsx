import Navbar from "@/components/shared/Navbar";

export const dynamic = 'force-dynamic';
const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default CommonLayout;

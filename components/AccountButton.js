import { useRouter } from "next/router"

export default function AccountButton() {

    const router = useRouter();

    const go_to_account_page = () => router.push('/account');

    return (
        <button onClick={go_to_account_page} className='flex flex-row gap-2 items-center justify-center text-xl border border-neutral-700 py-2 px-4 rounded hover:border-white transition-all'>
            {/* <Image src={near_logo} layout="responsive"/> */}
            My Account
        </button>
    )
}
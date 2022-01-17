import { useRouter } from "next/router"

export default function AccountButton({wallet}) {

    const router = useRouter();

    const go_to_account_page = () => router.push('/account');

    return (
        <button onClick={go_to_account_page} className='border border-neutral-700 px-4 py-1 rounded hover:border-white transition-all'>
            {/* <Image src={near_logo} layout="responsive"/> */}
            {wallet.getAccountId()}
        </button>
    )
}
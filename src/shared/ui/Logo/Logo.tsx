import Image from 'next/image';
import Link from 'next/link'

export default function Logo() {
    return (
        <Link href={'/'}>
            <Image src="logo.svg" alt='Logo' width={50} height={50} priority style={{ width: 50, height: 50 }}/>
        </Link>
    )
}

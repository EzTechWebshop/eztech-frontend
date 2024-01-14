import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import {
    IoFlagOutline,
    IoHomeOutline,
    IoInformationOutline,
    IoMenuOutline,
    IoPeopleCircleOutline,
    IoStorefrontOutline,
} from 'react-icons/io5'

export default function NavbarMenu() {
    return (
        <>
            <div className="hidden md:flex gap-4 justify-center">
                <Link href={'/'}>
                    <Button variant={'outline'}>
                        <IoHomeOutline size={20} /> Home
                    </Button>
                </Link>
                <Link href={'/catalog'}>
                    <Button variant={'outline'}>
                        <IoStorefrontOutline size={20} /> Catalog
                    </Button>
                </Link>
                <Link href={'/faq'}>
                    <Button variant={'outline'}>
                        <IoInformationOutline size={20} /> FAQ
                    </Button>
                </Link>
                <Link href={'/about-us'}>
                    <Button variant={'outline'}>
                        <IoPeopleCircleOutline size={20} />
                        About Us
                    </Button>
                </Link>
            </div>
            <div className="flex md:hidden items-center justify-start">
                <DropdownMenu>
                    <Link href={'/'}>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'ghost'}>
                                <IoMenuOutline size={20} />
                            </Button>
                        </DropdownMenuTrigger>
                    </Link>
                    <DropdownMenuContent>
                        <Link href={'/'}>
                            <DropdownMenuItem>
                                Home
                                <DropdownMenuShortcut>
                                    <IoHomeOutline size={12} />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </Link>
                        <Link href={'/catalog'}>
                            <DropdownMenuItem>
                                Catalog
                                <DropdownMenuShortcut>
                                    <IoStorefrontOutline size={12} />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </Link>
                        <Link href={'/faq'}>
                            <DropdownMenuItem>
                                FAQ
                                <DropdownMenuShortcut>
                                    <IoInformationOutline size={12} />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </Link>
                        <Link href={'/about'}>
                            <DropdownMenuItem>
                                About
                                <DropdownMenuShortcut>
                                    <IoPeopleCircleOutline size={12} />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}

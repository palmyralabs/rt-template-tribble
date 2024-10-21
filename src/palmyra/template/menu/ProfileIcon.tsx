import { Button, Popover } from "@mantine/core"

interface IProfile {
    displayName: string
}

const ProfileIcon = (props: IProfile) => {
    return <div className="profile-menu"> <Popover width={200} position="bottom" withArrow shadow="md">
        <Popover.Target>
            <Button>Welcome {props.displayName}</Button>
        </Popover.Target>
        <Popover.Dropdown>
            <ul>
                <li>
                    <span className='profile-sub-menu'>Profile</span>
                </li>
                <li>
                    <span className='profile-sub-menu'>Settings</span>
                </li>
                <li>
                    <span className='profile-sub-menu'>Log out</span>
                </li>
            </ul>
        </Popover.Dropdown>
    </Popover>
    </div>
}

export { ProfileIcon }
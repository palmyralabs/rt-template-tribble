import { Button, Popover } from "@mantine/core"

interface IProfile {
    displayName: string
}

const ProfileIcon = (props: IProfile) => {
    return <div className="profile-menu"> <Popover width={200} position="bottom" withArrow>
        <Popover.Target>
            <Button variant="transparent" size="compact-md">Welcome {props.displayName}</Button>
        </Popover.Target>
        <Popover.Dropdown>
            <div className="profile-menu-list-container">
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
            </div>
        </Popover.Dropdown>
    </Popover>
    </div>
}

export { ProfileIcon }
import { Switch } from '@nextui-org/react';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';

export default function DarkThemeSwitch ({ setLightMode }) {
  return (
    <Switch
      defaultSelected
      size='lg'
      color='primary'
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <IoMdSunny className={className} />
        ) : (
          <IoMdMoon className={className} />
        )
      }
      onChange={(event) => setLightMode(event.target.checked)}
    />
  );
};
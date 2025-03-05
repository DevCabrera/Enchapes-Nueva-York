import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import PropTypes from "prop-types"; // Importa PropTypes

const PhoneInput = ({ value, onChange, error, disabled }) => {
  return (
    <div className="w-full">
      <div className="relative flex w-full">
        {/* Selector de código de país (solo Chile) */}
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button
              ripple={false}
              variant="text"
              color="white"
              className="h-10 w-14 shrink-0 rounded-r-none border border-r-0 border-blue-gray-200 bg-transparent px-3"
              disabled={disabled}
            >
              +56
            </Button>
          </MenuHandler>
          <MenuList className="max-h-[20rem] max-w-[18rem]">
            <MenuItem disabled>Chile (+56)</MenuItem>
          </MenuList>
        </Menu>

        {/* Input para el número de teléfono */}
        <Input
          type="tel"
          pattern="[0-9]*"
          inputMode="numeric"
          maxLength={9}
          placeholder="9XXXXXXXX"
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`rounded-l-none !border-t-blue-gray-200 placeholder:text-white placeholder:opacity-100 focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${error ? "border-red-500" : ""
            }`}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "min-w-0",
          }}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Define los prop types
PhoneInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

export default PhoneInput;

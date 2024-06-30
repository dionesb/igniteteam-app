import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

// Styles
import { Container } from "./Input.styles";

interface IInputProps extends TextInputProps {
    inputRef?: React.RefObject<TextInput>;
}

const Input: React.FC<IInputProps> = ({ inputRef, ...rest }) => {
    const { COLORS } = useTheme();

    return <Container ref={inputRef} placeholderTextColor={COLORS.GRAY_300} {...rest} />;
};

export default Input;

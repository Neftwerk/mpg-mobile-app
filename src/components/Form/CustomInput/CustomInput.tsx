import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface ICustomInputProps<T extends FieldValues> {
	label: string;
	placeholder: string;
	secureTextEntry?: boolean;
	name: Path<T>;
	control: Control<T>;
	testID?: string;
}

export const CustomInput = <T extends FieldValues>({
	label,
	placeholder,
	secureTextEntry,
	name,
	control,
	testID,
	...props
}: ICustomInputProps<T> & TextInputProps) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, onBlur, value },
				fieldState: { error },
			}) => (
				<View className={`w-[75%] pt-6 ${props.className}`}>
					<Text className="text-sm font-medium py-2">{label}</Text>
					<TextInput
						className="border border-gray-300 rounded-md p-2"
						placeholder={placeholder}
						secureTextEntry={secureTextEntry}
						onChangeText={onChange}
						onBlur={onBlur}
						value={value}
						{...props}
						testID={testID}
					/>
					{error && (
						<Text className="text-red-500 text-sm" testID={`${testID}Error`}>
							{error?.message}
						</Text>
					)}
				</View>
			)}
		/>
	);
};

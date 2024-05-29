export const getFilePreview = (file: File, setImagePreview: React.Dispatch<React.SetStateAction<string>>) => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = () => {
        setImagePreview(fr.result);
    };
};
export const allowsFile = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'image/gif'];

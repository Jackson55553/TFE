import { ImageForUri } from '../../types/ImageForUri';
import { RequiredValues } from '../../types/RequiredValues';

export function validateForm(valuesRequired: RequiredValues, imageForUri: ImageForUri) {
    const result = { isValid: true, message: '' };
    validateInputs(valuesRequired, result);
    validateImage(imageForUri, result);

    if (result.isValid) {
        result.message = 'Succes';
        return result;
    } else {
        result.isValid = false;
        return result;
    }
}

function validateInputs(valuesRequired: RequiredValues, result: { isValid: boolean; message: string }) {
    Object.keys(valuesRequired).forEach((value) => {
        if (!result.isValid) {
            return;
        }
        if (value === 'decimals' && (+valuesRequired[value] > 9 || +valuesRequired[value] <= 0)) {
            result.message = 'bad decimals';
            console.log('bad decimals');
            result.isValid = false;
            return;
        }
        if (value === 'supply' && (+valuesRequired[value] > 18446744073709551615 || +valuesRequired[value] <= 0)) {
            result.message = 'bad supply';
            console.log('bad supply');
            result.isValid = false;
            return;
        }
        if (!valuesRequired[value].length) {
            result.message = 'bad input length';
            console.log('bad input length');
            result.isValid = false;
            return;
        }
    });
}

function validateImage(imageForUri: ImageForUri, result: { isValid: boolean; message: string }) {
    if (!result.isValid) {
        return;
    }
    Object.keys(imageForUri).forEach((value) => {
        if (!result.isValid) {
            return;
        }
        if (value === 'file' && typeof imageForUri[value] === 'string') {
            if (!imageForUri[value].length) {
                result.message = 'badUrl';
                console.log('badUrl');
                result.isValid = false;
                return;
            }
        } else if (value === 'file' && typeof imageForUri[value] === 'object') {
            if (Object.keys(value).length === 0) {
                result.message = 'bad file';
                console.log('bad file');
                result.isValid = false;
                return;
            }
        }
    });
}

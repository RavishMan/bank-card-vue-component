/**
 * Compare current length with preset length
 * @param { String } type - Key of preset object
 * @returns { Function } - curried function
 */
export const length = type =>
    /**
     * @param { String } value - Value for comparing
     * @param { Object } vm - Instance
     * @returns { Boolean }
     */
    (value, vm) => {
        const inputSymbolCount = value.replace(/\s/g, "").length;
        // Crutch of variables of card number length for maestro
        const isMaestroCard = vm.cardInfo.brandAlias === "maestro";
        if (isMaestroCard && inputSymbolCount >= 18) {
            return true;
        }

        const cardTypeMaskSymbolCount = vm[type].replace(/\s/g, "").length;
        const allowedBanks = ['mir', null];
        if (allowedBanks.includes(vm.cardInfo.brandAlias)) {
            const defaultNumberMask = "#### #### #### ####";
            const defaultMaskSymbolCount = defaultNumberMask.replace(/\s/g, "").length;

            const allowedSymbolCount = [defaultMaskSymbolCount, cardTypeMaskSymbolCount];
            if (allowedSymbolCount.includes(inputSymbolCount)) {
                return true;
            }
        }
        return inputSymbolCount === cardTypeMaskSymbolCount;
    };

/**
 * Compare current value with minimum value
 * @param { String } min - Key of minimum value
 * @returns { Function }
 */
export const minValue = min =>
    /**
     * @param { String } value - Value for comparing
     * @param { Object } vm - Instance
     * @returns { Boolean }
     */
    (value, vm) => +value >= +vm[min];

/**
 * Compare current value with maximum value
 * @param { String } max - Key of maximum value
 * @returns { Function }
 */
export const maxValue = max =>
    /**
     * @param { String } value - Value for comparing
     * @param { Object } vm - Instance
     * @returns { Boolean }
     */
    (value, vm) => +value <= +vm[max];

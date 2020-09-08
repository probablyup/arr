export type Reducer<T, R=T> = (
	previous: R,
	item: T,
	index: number,
	arr: T[]
) => R;

export default function <ArrayItemType, ReturnType = ArrayItemType[]>(
	arr: ArrayItemType[],
	callback: Reducer<ArrayItemType, ReturnType>,
	initialValue?: ReturnType
): ReturnType;

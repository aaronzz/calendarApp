export const getItem = (): any => {
  const item = localStorage.getItem("favouriteList");

  if (item === null) return undefined;

  return JSON.parse(item);
};
export const setItem = (value: string): any => {
  localStorage.setItem("favouriteList", value);
};

export const addFavourite = (dateString: string, value: string): void => {
  const current = getItem();
  const toAdd = { [dateString]: [value] };

  if (!current) {
    setItem(JSON.stringify(toAdd));
  } else {
    if (!current[dateString]) {
      current[dateString] = [value];
    } else {
      current[dateString].push(value);
    }
    setItem(JSON.stringify(current));
  }
};

export const removeFavourite = (dateString: string, value: string): void => {
  const current = getItem();

  if (current) {
    if (current[dateString]) {
      current[dateString] = [value];
      const index = current[dateString].indexOf(value);
      if (index > -1) {
        current[dateString].splice(index, 1);
      }
      setItem(JSON.stringify(current));
    }
  }
};

export const isFavouriteExist = (
  dateString: string,
  value: string
): boolean => {
  const current = getItem();
  if (current && current[dateString]) {
    return current[dateString].includes(value);
  }
  return false;
};

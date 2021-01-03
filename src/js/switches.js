// translate values into polish
export const nameChanger = (category) => {
  switch (category) {
    case 'bread':
      return 'Pieczywo';
    case 'dairy':
      return 'Nabiał';
    case 'sweets':
      return 'Słodycze';
    case 'chemicals':
      return 'Chemia';
    case 'fruits':
      return 'Owoce';
    case 'cosmetics':
      return 'Kosmetyki';
    case 'other':
      return 'Inne';
    default:
      return 'Inne';
  }
};

// select color for each category
export const pickColor = (category) => {
  switch (category) {
    case 'bread':
      return 'warning';
    // break;
    case 'dairy':
      return 'info';
    // break;
    case 'sweets':
      return 'success';
    // break;
    case 'chemicals':
      return 'secondary';
    // break;
    case 'cosmetics':
      return 'danger';
    // break;
    case 'fruits':
      return 'dark';
    // break
    case 'other':
      return 'primary';
    // break;
    default:
      return 'primary';
  }
};

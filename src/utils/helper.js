export const searchRegEx = /[^\w\s+@.]/gi
export const emailTemplateRegEx = /{{{ *[A-Za-z0-9]* *}}}/g

export const permissionLabel = (label, t) => {
    switch (label) {
      case 'C':
        return t('permissions.create', {ns: 'translation'})
      case 'R':
        return t('permissions.read', {ns: 'translation'})
      case 'DR':
        return t('permissions.dashBoardReports', {ns: 'translation'})
      case 'U':
        return t('permissions.update', {ns: 'translation'})
      case 'D':
        return t('permissions.delete', {ns: 'translation'})
      case 'T':
        return t('permissions.toggleStatus', {ns: 'translation'})
      case 'A':
        return t('permissions.apply', {ns: 'translation'})
      case 'GC':
        return t('permissions.createCustom', {ns: 'translation'})
      case 'SR':
        return t('permissions.limit', {ns: 'translation'})
      case 'AB':
        return t('permissions.manageWallet', {ns: 'translation'})
      case 'TE':
        return t('permissions.testEmail', {ns: 'translation'})
      default:
        return label
    }
  }

  export const customLabel = (label, t) => {
    switch (label) {
      case 'C':
        return t('permissions.assign', {ns: 'translation'})
      case 'R':
        return t('permissions.read', {ns: 'translation'})
      case 'U':
        return t('permissions.resolve', {ns: 'translation'})
      default:
        return label
    }
  }


export const isJson = (str) => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

export const commonDateTimeFormat = {
  'date': 'MM/DD/YYYY',
  'dateWithTime': 'MM/DD/YYYY hh:mm A'
}

export const removeHTMLTags = (s) => {
  const pattern = new RegExp("\\<.*?\\>");
  s = new String(s).replace(pattern, "");
  return s;
}

export const downloadCSVFromApiResponse = (apiResponse) => {
  const csvData = apiResponse.csvData;
  const blob = new Blob([csvData], { type: 'text/csv' });
  const blobURL = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobURL;
  a.download = apiResponse.fileName;
  a.click();
  URL.revokeObjectURL(blobURL);
}

export function updatePermissionsOrder(user) {
  if(!user) return user
  const newOrder = ["R", "C", "U", "T", "D"];

  const reorderPermissions = (permissions) => {
    const orderedPermissions = newOrder.filter(permission => permissions.includes(permission));
    const remainingPermissions = permissions.filter(permission => !newOrder.includes(permission));
    return [...orderedPermissions, ...remainingPermissions];
  };

  if (user.userPermission && user.userPermission.permission) {
    const { permission } = user.userPermission;

    for (let key in permission) {
      if (Array.isArray(permission[key])) {
        permission[key] = reorderPermissions(permission[key]);
      }
    }
  }

  return user;
}
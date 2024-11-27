export const sortTreeHelper = (tree: any) => {
  const sortTree = (tree: any) => {
    tree.sort((a: any, b: any) => {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      return 0;
    });
    tree.forEach((node: any) => {
      if (node.children.length > 0) {
        sortTree(node.children);
      }
    });
  };

  sortTree(tree);
  return tree;
};

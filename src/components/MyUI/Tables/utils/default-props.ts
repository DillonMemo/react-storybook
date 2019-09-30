import { MTableHeader } from "../components";

export const defaultProps = {
  columns: [],
  components: {
    Header: MTableHeader
    // Body: MComponents.MTableBody,
  },
  options: {
    header: true
  },
  data: [],
  style: {}
};

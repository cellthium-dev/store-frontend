import { Text } from "@medusajs/ui"

import { FaStripe } from "react-icons/fa"

const MedusaCTA = () => {
  return (
    <Text className="flex gap-x-2 txt-compact-small-plus items-center">
      Powered by
      <FaStripe className="text-gray-500 " size={40} />
    </Text>
  )
}

export default MedusaCTA

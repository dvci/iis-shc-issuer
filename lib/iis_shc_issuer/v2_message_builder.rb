# frozen_string_literal: true

module IisShcIssuer
  # Build HL7 V2 message from a patient hash
  module V2MessageBuilder
    module_function

    # Build a QBP V2 Message based upon patient parameters
    def build_hl7_message(patient_info) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
      # Disabling method length Rubocop warnings due to probable future refactor and moving of repos
      raw_input = File.open('lib/assets/qbp.hl7').readlines
      msg_input = HL7::Message.new(raw_input)

      # Build MSH Segment
      uid = rand(10_000_000_000).to_s
      msh = msg_input[:MSH]
      msh.time = Time.zone.now
      msh.message_control_id = uid

      # Build QPD segnment
      qpd = msg_input[:QPD]
      qpd.query_tag = uid

      if patient_info[:patient_list]
        patient_id_list = HL7::MessageParser.split_by_delimiter(qpd.patient_id_list, msg_input.item_delim)
        patient_id_list[1] = patient_info[:patient_list][:id] # ID
        patient_id_list[4] = patient_info[:patient_list][:assigning_authority] # assigning authority
        patient_id_list[5] = patient_info[:patient_list][:identifier_type_code] # identifier type code
        qpd.patient_id_list = patient_id_list.join(msg_input.item_delim)
      end

      if patient_info[:patient_name]
        patient_name = HL7::MessageParser.split_by_delimiter(qpd.patient_name, msg_input.item_delim)
        patient_name[0] = patient_info[:patient_name][:family_name] # family name
        patient_name[1] = patient_info[:patient_name][:given_name] # given name
        patient_name[2] = patient_info[:patient_name][:second_or_further_names] # second name
        patient_name[3] = patient_info[:patient_name][:suffix] # suffix name
        qpd.patient_name = patient_name.join(msg_input.item_delim)
      end

      if patient_info[:mothers_maiden_name]
        mother_maiden_name = HL7::MessageParser.split_by_delimiter(qpd.mother_maiden_name, msg_input.item_delim)
        mother_maiden_name[0] = patient_info[:mothers_maiden_name][:family_name] # family name
        mother_maiden_name[1] = patient_info[:mothers_maiden_name][:given_name] # given name
        mother_maiden_name[6] = patient_info[:mothers_maiden_name][:name_type_code] # name type code, M = Maiden Name
        qpd.mother_maiden_name = mother_maiden_name.join(msg_input.item_delim)
      end

      qpd.patient_dob = patient_info[:patient_dob]

      qpd.admin_sex = patient_info[:admin_sex]

      if patient_info[:address]
        address = HL7::MessageParser.split_by_delimiter(qpd.address, msg_input.item_delim)
        address[0] = patient_info[:address][:street] # street address
        address[2] = patient_info[:address][:city] # city
        address[3] = patient_info[:address][:state] # state
        address[4] = patient_info[:address][:zip] # zip
        address[6] = patient_info[:address][:address_type] # address type
        qpd.address = address.join(msg_input.item_delim)
      end

      if patient_info[:phone]
        phone_home = HL7::MessageParser.split_by_delimiter(qpd.phone_home, msg_input.item_delim)
        phone_home[5] = patient_info[:phone][:area_code] # area code
        phone_home[6] = patient_info[:phone][:local_number] # local number
        qpd.phone_home = phone_home.join(msg_input.item_delim)
      end

      msg_input
    end
  end
end

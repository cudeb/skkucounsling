export type ICounselingUser = {
    birth: string,
    id: number,
    phone_number: string,
    realname: string,
    student_number: string,
    user_type: string,
    username: string,
    email:string
}

export type ICounselingStudentDetail = {
    id: number,
    user: ICounselingUser,
}

export type ICounselingPrefertimeslots = {
    id: number,
    timeslot: string,
}

export type ICounselingPreferfields = {
    id: number,
    field: string,
}

export type ICounselingApplicationDetail = {
    id: number,
    student: ICounselingStudentDetail,
    application_file: string,
    applied_at: string,
    counseling_type: string,
    test_date: string,
    test_timeslot: string,
    approved: boolean,
    denied: boolean,
    counseling_prefertimeslots: ICounselingPrefertimeslots[],
    counseling_preferfields: ICounselingPreferfields[]
}


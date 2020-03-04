import url from "../../config/url";
// import { get, post } from "../../src/axios";
import config from "../../config";

const email = "vukhuongduy2305@gmail.com";

exports.listAccount = [
  {
    _id: 111,
    user: {
      _id: 11,
      username: "duyvu",
      password: "duyvu",
      email: "vukuhongduy2305@gmail.com",
      active: "true",
      code: "122311"
    },
    name: "account-test1",
    accessKeyId: "asdfasdf",
    secretAccessKey: "qwerqwer",
    region: "us-west-2",
    running: 1,
    countInstance: 1
  },
  {
    _id: 112,
    user: {
      _id: 11,
      username: "duyvu",
      password: "duyvu",
      email: "vukuhongduy2305@gmail.com",
      active: "true",
      code: "122311"
    },
    name: "account-test1",
    accessKeyId: "asdfasdf",
    secretAccessKey: "qwerqwer",
    region: "us-west-2",
    running: 1,
    countInstance: 1
  },
  {
    _id: 1123,
    user: {
      _id: 11,
      username: "duyvu",
      password: "duyvu",
      email: "vukuhongduy2305@gmail.com",
      active: "true",
      code: "122311"
    },
    name: "account-test1",
    accessKeyId: "esdf",
    secretAccessKey: "qwasda",
    region: "us-west-2",
    running: 1,
    countInstance: 1
  }
];

exports.listUser = [
  {
    _id: 11,
    username: "duyvu",
    password: "duyvu",
    email: "vukuhongduy2305@gmail.com",
    active: "true",
    code: "122311"
  },
  {
    _id: 12,
    username: "vuduy",
    password: "vuduy",
    email: "vukuhongduy23@gmail.com",
    active: "true",
    code: "323232"
  }
];

exports.listInstance = [
  {
    Instances: [
      {
        InstanceId: "sdfasdfasdfasd",
        Tags: [
          {
            Key: "name",
            Value: "vm-test"
          }
        ],
        State: {
          Code: 80,
          Name: "stopped"
        },
        KeyName: "duy-key",
        InstanceType: "t2.micro",
        ImageId: "ami-0b37e9efc396e4c38",
        LaunchTime: "2019-08-25T09:03:40.000Z",
        Placement: {
          AvailabilityZone: "us-west-2a"
        }
      }
    ],
    idAccount: "111"
  },
  {
    Instances: [
      {
        InstanceId: "adsfadsfaawewe",
        Tags: [
          {
            Key: "name",
            Value: "vm-test"
          }
        ],
        State: {
          Code: 80,
          Name: "stopped"
        },
        KeyName: "duy-key",
        InstanceType: "t2.micro",
        ImageId: "ami-0b37e9efc396e4c38",
        LaunchTime: "2019-08-25T09:03:40.000Z",
        Placement: {
          AvailabilityZone: "us-west-2a"
        }
      }
    ],
    idAccount: "111"
  },
  {
    Instances: [
      {
        InstanceId: "xvxcvxcvxc",
        Tags: [
          {
            Key: "name",
            Value: "vm-test"
          }
        ],
        State: {
          Code: 80,
          Name: "stopped"
        },
        KeyName: "duy-key",
        InstanceType: "t2.micro",
        ImageId: "ami-0b37e9efc396e4c38",
        LaunchTime: "2019-08-25T09:03:40.000Z",
        Placement: {
          AvailabilityZone: "us-west-2a"
        }
      }
    ],
    idAccount: "111"
  }
];

exports.listPlan = [
  {
    _id: "1123123123",
    user: "5d69305f0ac076203716980c",
    typePlan: "account_name",
    valueObjectPlan: "account_test",
    time: "19:19:19",
    date: "12-12-2019",
    action: "start",
    schedule: "daily"
  },
  {
    _id: "112312123123",
    user: "5d69305f0ac076203716980c",
    typePlan: "account_name",
    valueObjectPlan: "account_test",
    time: "19:19:19",
    date: "12-12-2019",
    action: "start",
    schedule: "daily"
  },
  {
    _id: "112dssf",
    user: "5d69305f0ac076203716980c",
    typePlan: "account_name",
    valueObjectPlan: "account_test",
    time: "19:19:19",
    date: "12-12-2019",
    action: "start",
    schedule: "daily"
  },
  {
    _id: "112312sad",
    user: "5d69305f0ac076203716980c",
    typePlan: "account_name",
    valueObjectPlan: "account_test",
    time: "19:19:19",
    date: "12-12-2019",
    action: "start",
    schedule: "daily"
  }
];

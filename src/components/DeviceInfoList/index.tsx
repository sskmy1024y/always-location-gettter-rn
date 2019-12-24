import React, { useState, useEffect } from 'react'
import { ListItem, Left, Right, Separator } from 'native-base'
import { View, Text, ScrollView } from 'react-native'
import BackgroundGeolocation, {
  DeviceInfo,
  State,
  Location,
  Sensors
} from 'react-native-background-geolocation'

function DeviceInfoList() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null)
  const [geoState, setGetState] = useState<State | null>(null)
  const [sensors, setSensors] = useState<Sensors | null>(null)
  const [currentPosition, setCurrentPosition] = useState<Location | null>(null)

  useEffect(() => {
    BackgroundGeolocation.getDeviceInfo().then(info => setDeviceInfo(info))
    BackgroundGeolocation.getState().then(state => setGetState(state))
    BackgroundGeolocation.getSensors().then(sensors => setSensors(sensors))
    BackgroundGeolocation.getCurrentPosition({
      timeout: 30,
      maximumAge: 5000,
      desiredAccuracy: 10,
      samples: 3
    }).then(position => setCurrentPosition(position))
  }, [])

  return (
    <ScrollView>
      <Separator bordered>
        <Text>Device Info</Text>
      </Separator>
      <ListItem>
        <Left>
          <Text>platform</Text>
        </Left>
        <Right>
          <Text>{deviceInfo?.platform}</Text>
        </Right>
      </ListItem>
      <ListItem>
        <Left>
          <Text>model</Text>
        </Left>
        <Right>
          <Text>{deviceInfo?.model}</Text>
        </Right>
      </ListItem>
      <ListItem>
        <Left>
          <Text>version</Text>
        </Left>
        <Right>
          <Text>{deviceInfo?.version}</Text>
        </Right>
      </ListItem>
      <ListItem>
        <Left>
          <Text>EnableBackgroundGeolocation</Text>
        </Left>
        <Right>
          <Text>{`${geoState?.enabled}`}</Text>
        </Right>
      </ListItem>
      <ListItem>
        <Left>
          <Text>Odometer</Text>
        </Left>
        <Right>
          <Text>{geoState?.odometer}</Text>
        </Right>
      </ListItem>
      {currentPosition !== null && (
        <>
          <Separator bordered>
            <Text>Current Position</Text>
          </Separator>
          <ListItem>
            <Left>
              <Text>event</Text>
            </Left>
            <Right>
              <Text>{`${currentPosition?.event}`}</Text>
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>isMoving</Text>
            </Left>
            <Right>
              <Text>{`${currentPosition?.isMoving}`}</Text>
            </Right>
          </ListItem>
        </>
      )}
      {sensors !== null && (
        <>
          <Separator bordered>
            <Text>Sensors</Text>
          </Separator>
          <ListItem>
            <Left>
              <Text>accelerometer</Text>
            </Left>
            <Right>
              <Text>{`${sensors?.accelerometer}`}</Text>
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>magnetometer</Text>
            </Left>
            <Right>
              <Text>{`${sensors?.magnetometer}`}</Text>
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>gyroscope</Text>
            </Left>
            <Right>
              <Text>{`${sensors?.gyroscope}`}</Text>
            </Right>
          </ListItem>
        </>
      )}
    </ScrollView>
  )
}

export default DeviceInfoList
